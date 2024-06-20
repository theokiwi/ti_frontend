document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("popup");
  const closePopupBtn = document.getElementById("closePopupBtn");
  const commentForm = document.getElementById("commentForm");
  const commentInput = document.getElementById("comment");
  const charCount = document.getElementById("charCount");
  const MAX_CHARS = 200;

  let commentsData = {
    comments: [],
  };

  const updateCharCount = () => {
    const currentLength = commentInput.value.length;
    charCount.textContent = `${currentLength}/${MAX_CHARS}`;
    charCount.style.color = currentLength > MAX_CHARS ? "red" : "#666";
  };

  const resetForm = () => {
    commentForm.reset();
    updateCharCount();
  };

  // Salvar a URL atual ao abrir o pop-up
  const openPopup = () => {
    const currentURL = window.location.href;
    sessionStorage.setItem('previousURL', currentURL);
    popup.style.display = "block";
  };

  closePopupBtn.addEventListener("click", () => {
    popup.style.display = "none";
    // Redirecionar para a URL anterior
    window.history.back();
  });

  commentInput.addEventListener("input", updateCharCount);

  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const comment = document.getElementById("comment").value;

    if (comment.length > MAX_CHARS) {
      alert("Comentário excede o comprimento máximo.");
      return;
    }

    commentsData.comments.push({
      username: username,
      comment: comment,
    });

    console.log(
      "Comentários Atualizados:",
      JSON.stringify(commentsData, null, 2)
    );

    window.location.href = "success.html";
  });

  // Chame a função openPopup quando quiser abrir o pop-up
  // Exemplo:
  // document.getElementById("openPopupBtn").addEventListener("click", openPopup);
});
