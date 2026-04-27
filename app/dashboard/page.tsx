"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import DashboardUI from "../components/DashboardUI";

export default function Dashboard() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [articles, setArticles] = useState<any[]>([]);

  //  GET USER + PROFILE
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();

    if (!data.user) return;

    setAuthUser(data.user);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", data.user.id)
      .single();

    setProfile(profileData);
  };

  // GET ARTICLES + COMMENTS + LIKES
  const getArticles = async () => {
    const { data: articlesData } = await supabase.from("articles").select("*");
    const { data: likesData } = await supabase.from("likes").select("*");
    const { data: commentsData } = await supabase.from("comments").select("*");
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("id, username");

    const merged = (articlesData || []).map((article) => ({
      ...article,

      likes: (likesData || []).filter(
        (l) => l.article_id === article.id
      ),

      comments: (commentsData || [])
        .filter((c) => c.article_id === article.id)
        .map((c) => ({
          ...c,
          username:
            profilesData?.find((p) => p.id === c.user_id)?.username ||
            "User",
        })),
    }));

    setArticles(merged);
  };

  // LIKE
  const handleLike = async (articleId: string) => {
    if (!authUser) return;

    const { data: existing } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", authUser.id)
      .eq("article_id", articleId)
      .maybeSingle();

    if (existing) {
      await supabase.from("likes").delete().eq("id", existing.id);
    } else {
      await supabase.from("likes").insert([
        {
          user_id: authUser.id,
          article_id: articleId,
        },
      ]);
    }

    await getArticles();
  };

  // COMMENT + REPLY 
  const handleComment = async (
    articleId: string,
    content: string,
    parentId: string | null = null
  ) => {
    if (!authUser || !content.trim()) return;

    await supabase.from("comments").insert([
      {
        article_id: articleId,
        user_id: authUser.id,
        content: content.trim(),
        parent_id: parentId,
      },
    ]);

    await getArticles();
  };
  const handleShare = async (article: any) => {
  const url = `${window.location.origin}/dashboard?article=${article.id}`;

  //Native mobile share
  if (navigator.share) {
    try {
      await navigator.share({
        title: article.title,
        text: article.content,
        url,
      });
      return;
    } catch (err) {
      console.log("Share cancelled");
    }
  }

  // copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  } catch (err) {
    alert("Failed to copy link");
  }
};

  // LOGOUT 
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setProfile(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    getUser();
    getArticles();
  }, []);

  const topArticles = [...articles]
    .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
    .slice(0, 5);

  return (
    <DashboardUI
      email={authUser?.email || ""}
      username={profile?.username || "User"}
      handleLogout={handleLogout}
      articles={articles}
      handleLike={handleLike}
      handleComment={handleComment}
      handleShare={handleShare}
      topArticles={topArticles}
    />
  );
}