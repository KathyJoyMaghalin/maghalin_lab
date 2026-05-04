type Props = {
  email: string;
  username: string;
  role?: string;

  handleLogout: () => void;

  articles: any[];
  handleLike: (articleId: string) => void;

  handleComment: (
    articleId: string,
    content: string,
    parentId?: string | null
  ) => void;

  topArticles: any[];
  handleShare: (article: any) => void;
};

export default function DashboardUI({
  email,
  username,
  role,
  handleLogout,
  articles,
  handleLike,
  handleComment,
  topArticles,
  handleShare,
}: Props) {
  const isAdmin = role === "admin";

  return (
    <div>
      {/* TOP BAR */}
      <div className="topbar">
        <span className="user-email">
          {username || email?.split("@")[0] || "User"} ({email}){" "}
          {isAdmin && "(Admin)"}
        </span>
      </div>

      {/* MAIN */}
      <div className="container">
        <h1>Welcome To Greenies!</h1>
      </div>

      {/* TOP 5 */}
      <div className="top-articles-box">
        <h2>Top 5 Most Popular</h2>

        {topArticles.map((a, i) => (
          <p key={a.id}>
            {i + 1}. {a.title} — 👍 {a.likes?.length || 0}
          </p>
        ))}
      </div>

      {/* ARTICLES */}
      {articles.map((article) => {
        const mainComments = article.comments?.filter(
          (c: any) => !c.parent_id
        );

        return (
          <div key={article.id} className="article-card">
            <div className="article-text">
              <h3>{article.title}</h3>
              <p>{article.content}</p>

              {article.url && (
                <a href={article.url} target="_blank">
                  Read full article →
                </a>
              )}

              {/* LIKE */}
              <button onClick={() => handleLike(article.id)}>
                👍 Like / Unlike
              </button>

              <p>Likes: {article.likes?.length || 0}</p>

              {/* SHARE */}
              <button onClick={() => handleShare(article)}>
                🔗 Share
              </button>

              {/* COMMENT INPUT */}
              <div style={{ marginTop: "10px" }}>
                <input
                  placeholder="Write a comment..."
                  id={`comment-${article.id}`}
                  style={{
                    width: "70%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                  }}
                />

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => {
                    const input = document.getElementById(
                      `comment-${article.id}`
                    ) as HTMLInputElement;

                    if (!input.value.trim()) return;

                    handleComment(article.id, input.value, null);
                    input.value = "";
                  }}
                >
                  Submit
                </button>
              </div>

              {/* COMMENTS + REPLIES */}
              {mainComments?.map((c: any) => {
                const commentId = c.comment_uuid || c.id;

                const replies = article.comments?.filter(
                  (r: any) => r.parent_id === commentId
                );

                return (
                  <div key={commentId} style={{ marginTop: "15px" }}>
                    <p>
                      💬 <strong>{c.username || "User"}:</strong> {c.content}
                    </p>

                    {/* REPLIES */}
                    <div style={{ marginLeft: "20px" }}>
                      {replies?.map((r: any) => (
                        <p key={r.comment_uuid || r.id}>
                          ↳ <strong>{r.username || "User"}:</strong>{" "}
                          {r.content}
                        </p>
                      ))}
                    </div>

                    {/* REPLY INPUT */}
                    <div style={{ marginLeft: "20px", marginTop: "5px" }}>
                      <input
                        placeholder="Reply..."
                        id={`reply-${commentId}`}
                        style={{
                          width: "60%",
                          padding: "6px",
                          border: "1px solid #ccc",
                          borderRadius: "6px",
                        }}
                      />

                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          const input = document.getElementById(
                            `reply-${commentId}`
                          ) as HTMLInputElement;

                          if (!input.value.trim()) return;

                          handleComment(article.id, input.value, commentId);

                          input.value = "";
                        }}
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* IMAGE */}
            {article.image_url && (
              <div className="article-image">
                <img
                  src={article.image_url}
                  alt={article.title}
                  title={article.title}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* LOGOUT */}
      <div className="bottom-bar">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
}