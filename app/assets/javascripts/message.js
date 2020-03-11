$(function(){
    function buildHTML(message){
      if (message.image) {
        var html =`<div class="chat-main__chat-home__message">
                    <div class="chat-main__chat-home__message__block">
                      <div class="chat-main__chat-home__message__block__current-user">
                        ${message.user_name}
                    </div>
                      <div class="chat-main__chat-home__message__block__current-user-date">
                        ${message.date}
                      </div>
                    </div>
                      <div class="chat-main__chat-home__message__current-text">
                        <p class="chat-main__chat-home__message__current-text__content">
                        ${message.content}
                        </p>
                      </div>
                      <img src=${message.image} >
                    </div>`
        return html;
      } else {
        var html =`<div class="chat-main__chat-home__message">
                    <div class="chat-main__chat-home__message__block">
                       <div class="chat-main__chat-home__message__block__current-user">
                        ${message.user_name}
                  </div>
                    <div class="chat-main__chat-home__message__block__current-user-date">
                        ${message.date}
                    </div>
                  </div>
                    <div class="chat-main__chat-home__message__current-text">
                      <p class="chat-main__chat-home__message__current-text__content">
                        ${message.content}
                      </p>
                  </div>
                </div>`
        return html;
      };
    }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(data){
       var html = buildHTML(data);
       $('.chat-main__chat-home').append(html);
       $('.chat-main__chat-home').animate({ scrollTop: $('.chat-main__chat-home')[0].scrollHeight});
       $('form')[0].reset();
       $('input').prop('disabled', false);
    })
     .fail(function() {
      alert("メッセージ送信に失敗しました");
      $('input').prop('disabled', false);
    });
  });
});