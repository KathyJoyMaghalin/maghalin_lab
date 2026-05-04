"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import DashboardUI from "../components/DashboardUI";

export default function AdminPage() {
  const [authUser, setAuthUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [articles, setArticles] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    setAuthUser(data.user);

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    setProfile(profileData);
  };

  const getArticles = async () => {
    const { data } = await supabase.from("articles").select("*");
    const { data: likesData } = await supabase.from("likes").select("*");
    const { data: commentsData } = await supabase.from("comments").select("*");
    const { data: profilesData } = await supabase.from("profiles").select("*");

    const merged = (data || []).map((a) => ({
      ...a,
      likes: (likesData || []).filter((l) => l.article_id === a.id),
      comments: (commentsData || [])
        .filter((c) => c.article_id === a.id)
        .map((c) => ({
          ...c,
          username:
            profilesData?.find((p) => p.id === c.user_id)?.username || "User",
        })),
    }));

    setArticles(merged);
  };

  const handleCreate = async () => {
    if (!title || !content) return;

    await supabase.from("articles").insert([
      {
        title,
        content,
        image_url: image,
        url: url,
      },
    ]);

    setTitle("");
    setContent("");
    setImage("");
    setUrl("");

    getArticles();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("articles").delete().eq("id", id);
    getArticles();
  };

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

    getArticles();
  };

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
        content,
        parent_id: parentId,
      },
    ]);

    getArticles();
  };

  // ✅ FIXED SHARE (same behavior as dashboard)
  const handleShare = async (article: any) => {
    const shareUrl = `${window.location.origin}/dashboard?article=${article.id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.content,
          url: shareUrl,
        });
        return;
      } catch (err) {
        console.log("Share cancelled or failed");
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link");
    }
  };

  useEffect(() => {
    getUser();
    getArticles();
  }, []);

  return (
    <div>
      {/* ADMIN TOOLS */}
      <div style={{ padding: 20 }}>
        <h2>Admin Panel</h2>

        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <input
          placeholder="Article Link (URL)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleCreate}>Publish</button>

        <hr />

        {articles.map((a) => (
          <button key={a.id} onClick={() => handleDelete(a.id)}>
            Delete {a.title}
          </button>
        ))}
      </div>

      {/* SAME UI */}
      <DashboardUI
        email={authUser?.email || ""}
        username={profile?.username || "User"}
        handleLogout={() => supabase.auth.signOut()}
        articles={articles}
        handleLike={handleLike}
        handleComment={handleComment}
        handleShare={handleShare}
        topArticles={[...articles]
          .sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
          .slice(0, 5)}
      />
    </div>
  );
}