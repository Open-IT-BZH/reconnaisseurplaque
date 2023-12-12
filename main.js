async function main () {
    const buttonStart = document.querySelector('#buttonStart')
    const buttonStop = document.querySelector('#buttonStop')
    const videoLive = document.querySelector('#videoLive')
    const videoRecorded = document.querySelector('#videoRecorded')
  
    const stream = await navigator.mediaDevices.getUserMedia({ // <1>
      video: true,
      audio: true,
    })
  
    videoLive.srcObject = stream
  
    if (!MediaRecorder.isTypeSupported('video/webm')) { // <2>
      console.warn('video/webm is not supported')
    }
  
    const mediaRecorder = new MediaRecorder(stream, { // <3>
      mimeType: 'video/webm',
    })
  
    buttonStart.addEventListener('click', () => {
      mediaRecorder.start() // <4>
      buttonStart.setAttribute('disabled', '')
      buttonStop.removeAttribute('disabled')
    })
  
    buttonStop.addEventListener('click', () => {
      mediaRecorder.stop() // <5>
      buttonStart.removeAttribute('disabled')
      buttonStop.setAttribute('disabled', '')
    })
  
    mediaRecorder.addEventListener('dataavailable', event => {
      videoRecorded.src = URL.createObjectURL(event.data) // <6>
    })
  }
  
  main()


//   Capture d'écran
var videoId = 'videoLive';
    var scaleFactor = 0.25;
    var snapshots = [];

    /**
     * Captures a image frame from the provided video element.
     *
     * @param {Video} video HTML5 video element from where the image frame will be captured.
     * @param {Number} scaleFactor Factor to scale the canvas element that will be return. This is an optional parameter.
     *
     * @return {Canvas}
     */
    function capture(video, scaleFactor) {
        if (scaleFactor == null) {
            scaleFactor = 1;
        }
        var w = video.videoWidth * scaleFactor;
        var h = video.videoHeight * scaleFactor;
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, w, h);
        return canvas; 
    }

    /**
     * Invokes the <code>capture</code> function and attaches the canvas element to the DOM.
     */
    function shoot() {
        var video = document.getElementById(videoId);
        var output = document.getElementById('output');
        var canvas = capture(video, scaleFactor);
    
        // Créer et ajouter un élément d'image à la liste de captures d'écran
        var imageElement = new Image();
        imageElement.src = canvas.toDataURL('image/png'); // Convertir le canvas en une URL d'image
        snapshots.unshift(imageElement);
        console.log("Source : ", imageElement)
    
        // Afficher les captures d'écran dans l'élément avec l'ID 'output'
        output.innerHTML = '';
        for (var i = 0; i < 4; i++) {
            output.appendChild(snapshots[i]);
        }
    }

(function() {
  var captureit = document.getElementById('cit');
  captureit.click();
})();