Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
    
    });
    Webcam.attach("#camera");
    
    function capture(){
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML= "<img id='captured_image' + src=" + data_uri + ">  ";
        });
    
        
    }
    console.log("ml5 version=", ml5.version);
    
    classifier= ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DpTnAKy4v/model.json",modelLoaded);
    
    function modelLoaded(){
        console.log("Model successfully Loaded!");
    
    }

    function speak(){
        var synth= window.speechSynthesis;
         speak_data= prediction;
         
         var utterThis= new SpeechSynthesisUtterance(speak_data);
         synth.speak(utterThis);
    }
    
    function identify(){
    
    img= document.getElementById('captured_image');
    classifier.classify(img, gotResult);
    
    }
    
    function gotResult(error, results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("hand_result1").innerHTML= results[0].label;
            
            prediction= results[0].label;
            
            speak();
            if(results[0].label== "thumbs up"){
                document.getElementById("emoji_result1").innerHTML= "&#128077;";
            }
            if(results[0].label== "peace"){
                document.getElementById("emoji_result1").innerHTML= "&#129304;";
            }
            if(results[0].label== "amazing"){
                document.getElementById("emoji_result1").innerHTML= "&#128076;";
            }
            if(results[0].label== "victory"){
                document.getElementById("emoji_result1").innerHTML= "&#9996;";
                
            }
            
        }
    }  