$(function(){
    var buildHTML = function (message) {
      console.log(message)
      if (message.content && message.image) {
        console.log(1)
        var html =`<div class="chat-main__chat-home__message" data-message-id="${message.id}">
                    <div class="chat-main__chat-home__message__block">
                      <div class="chat-main__chat-home__message__block__current-user">
                        ${message.user_name}
                    </div>
                      <div class="chat-main__chat-home__message__block__current-user-date">
                        ${message.created_at}
                      </div>
                    </div>
                      <div class="chat-main__chat-home__message__current-text">
                        <p class="chat-main__chat-home__message__current-text__content">
                        ${message.content}
                        </p>
                        <img src=${message.image} class="chat-main__chat-home__message__current-text__image" >  
                      </div>
                    </div>`
      } else if (message.content) {
        console.log(2)
        var html =`<div class="chat-main__chat-home__message" data-message-id="${message.id}">
                    <div class="chat-main__chat-home__message__block">
                       <div class="chat-main__chat-home__message__block__current-user">
                        ${message.user_name}
                  </div>
                    <div class="chat-main__chat-home__message__block__current-user-date">
                        ${message.created_at}
                    </div>
                  </div>
                    <div class="chat-main__chat-home__message__current-text">
                      <p class="chat-main__chat-home__message__current-text__content">
                        ${message.content}
                      </p>
                  </div>
                </div>`
      }else if(message.image) {
        console.log(3)
        var html =`<div class="chat-main__chat-home__message" data-message-id="${message.id}">
                     <div class="chat-main__chat-home__message__block">
                       <div class="chat-main__chat-home__message__block__current-user">
                        ${message.user_name}
                    </div>
                    <div class="chat-main__chat-home__message__block__current-user-date">
                        ${message.created_at}
                    </div>
                  </div>
                    <div class="chat-main__chat-home__message__current-text">
                    <img src=${message.image} class="chat-main__chat-home__message__current-text__image" >  
                  </div>
                </div>`
        };
      return html;
    };
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


    var reloadMessages = function() {
      var last_message_id = $('.chat-main__chat-home__message:last').data("message-id");
      console.log(last_message_id)
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.chat-main__chat-home').append(insertHTML);
          $('.chat-main__chat-home').animate({ scrollTop: $('.chat-main__chat-home')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
