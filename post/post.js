;(function(window){
  var interval = 1000
  var currentIndex
  var queue
  var listSelector
  var intervalHandle

  window.runPost = function (list, data) {
    listSelector = list
    queue = data || []

    $(listSelector).html('')
    currentIndex = 0
    clearInterval(intervalHandle)
    intervalHandle = setInterval(checkQueue, interval)
  }

  window.stopPost = function () {
    // $(listSelector).html('')
    clearInterval(intervalHandle)
  }

  function checkQueue () {
    var item  = queue.shift()
    if (item) {
      var col = Math.floor(currentIndex / 4)
      var index = currentIndex % 4

      if (col > 0) {
        $(listSelector).animate({ marginTop: '-183px' }, 'fast', 'linear', function() {
          $(listSelector + ' li:first-child').remove()
          $(listSelector).css('margin-top', 0)

          $(listSelector).append(getElementHtml(item))
        })
      } else {
        $(listSelector).append(getElementHtml(item))
      }

      currentIndex++
    }
  }

  function getElementHtml (data) {
    if (data.avatar) {
      return '<li class="p-item item-scale"><div class="avatar"><img src="' + data.avatar + '"><span>' + data.name + '</span></div><div class="content">' + data.content + '</div></li>'
    } else {
      var flag = Math.random() * 4 + 1 >> 0
      return '<li class="p-item item-scale"><div class="avatar"><div class="no-img color-' + flag + '">' + data.name.substr(0, 1) + '</div><span>' + data.name + '</span></div><div class="content">' + data.content + '</div></li>'
    }
  }
})(window);
