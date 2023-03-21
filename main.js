song = "";
function preload() {
    song=loadSound("music.mp3");
}
rwx=0;
rwy=0;
lwx=0;
lwy=0;
scorelw=0;
scorerw=0;
function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log('Pose net is initialized');
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scorerw=results[0].pose.keypoints[10].score;
        scorelw=results[0].pose.keypoints[9].score;
        console.log("Score left wrist = " + scorelw);
        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
        console.log('Left wrist x = ' + lwx + ' Left wrist y = ' +  lwy);
        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        console.log('Right wrist x = ' + rwx + ' Right wrist y = ' + rwy)
    }
} 
function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scorerw>0.2) {
        circle(rwx, rwy, 20);
        if(rwy>0 && rwy<=100) {
            document.getElementById("s").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rwy>100 && rwy<=200) {
            document.getElementById("s").innerHTML="Speed = 1x";
            song.rate(1);
        }
        else if(rwy>200 && rwy<=300) {
            document.getElementById("s").innerHTML="Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rwy>300 && rwy<=400) {
            document.getElementById("s").innerHTML="Speed = 2x";
            song.rate(2);
        }
        else if(rwy>400) {
            document.getElementById("s").innerHTML="Speed = 2.5x";
            song.rate(2.5);
        }
    }
    if (scorelw>0.2) {
    circle (lwx, lwy, 20);
    inumberlwy=Number(lwy);
    rd=floor(inumberlwy);
    volume=rd/500;
    document.getElementById("v").innerHTML="Volume = " + volume;
    song.setVolume(volume);    
    }
    
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}