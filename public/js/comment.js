async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector("#comment").value.trim();

  const postId = location.pathname.split("/")[2];

  if (comment_text) {
    console.log(comment_text, postId);
    const response = await fetch("/api/comments/" + postId, {
      method: "POST",
      body: JSON.stringify({
        postId,
        comment_text,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#addComment")
  .addEventListener("click", commentFormHandler);
