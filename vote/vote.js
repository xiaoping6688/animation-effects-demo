;(function(window){
  var interval = 1000
  var currentIndex
  var queue
  var containerSelector
  var listSelector
  var intervalHandle
  var flag
  var lastRatio = 0

  window.runVote = function (container, list, data) {
    containerSelector = container
    listSelector = list
    queue = data || []

    $(listSelector).html('')
    currentIndex = 0
    clearInterval(intervalHandle)
    intervalHandle = setInterval(checkQueue, interval)
  }

  window.stopVote = function () {
    // $(listSelector).html('')
    clearInterval(intervalHandle)
  }

  window.setAnimProgress = function (percent) {
    percent = Math.max(0, Math.min(Number(percent) >> 0, 100))

    // $('.v-progress .bar span').animate({ width: percent + '%' }, 1000, 'linear')
    $('.v-progress .bar span').css('width', percent + '%')
    $('.v-progress .progress-ratio').html(percent + '%')

    if (percent && percent / 10 >> 0 != lastRatio / 10 >> 0) {
      $('.v-progress .progress-ratio').animateCss('item-scale')
    }

    lastRatio = percent
  }

  function checkQueue () {
    var item  = queue.shift()
    if (item) {
      flag = Math.random() * 4 + 1 >> 0

      showAvatar(item, 1000)

      var col = Math.floor(currentIndex / 2)
      var index = currentIndex % 2

      if (col > 0) {
        $(listSelector).animate({ marginTop: '-90px' }, 'fast', 'linear', function() {
          $(listSelector + ' li:first-child').remove()
          $(listSelector).css('margin-top', 0)
        })
      }

      // 添加元素
      $(listSelector).append(getElementHtml(item))

      currentIndex++

      checkQueue()
    }
  }

  function getElementHtml (data) {
    if (data.avatar) {
      return '<li class="v-item"><div class="avatar"><img src="' + data.avatar + '"></div><span class="name">' + data.name + '</span><span>已投</span></li>'
    } else {
      return '<li class="v-item"><div class="avatar color-' + flag + '">' + data.name.substr(0, 1) + '</div><span class="name">' + data.name + '</span><span>已投</span></li>'
    }
  }
  function getAvatarHtml (data) {
    if (data.avatar) {
      return '<div class="v-avatar"><img src="' + data.avatar + '"></div>'
    } else {
      return '<div class="v-avatar color-' + flag + '"><span>' + data.name + '</span></div>'
    }
  }

  function showAvatar (data, duration) {
    var avatar = $(getAvatarHtml(data))
    avatar.appendTo(containerSelector)
    avatar.css('top', -250 - Math.random() * 100)
    avatar.css('left', Math.random() * 1350)
    avatar.stop().animate({ top: '150px' }, duration, 'swing', function() {
      avatar.animate({ opacity: 0 }, 600, 'linear', function(){
        avatar.remove()
      })
    })
  }

  $.fn.extend({
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
      this.addClass(animationName).one(animationEnd, function() {
        $(this).removeClass(animationName)
      })
    }
  })
})(window);
