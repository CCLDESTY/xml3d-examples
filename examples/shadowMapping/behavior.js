
$(function() {
    $( "#drive_switch" ).button();
    $( "#drive_switch" ).click(function(e) {
        shouldAnimate = e.target.checked;
        animate();
    });
});
var track_pos = 0.0;
var car_rot = new XML3DRotation(new XML3DVec3(0,1.0,0),0),
    shouldAnimate = false;
var car_pos = new XML3DVec3(0.0, 0.0, 0.0);
function animate() {
    var t = document.getElementById("t_Car");
    //////////////////////
    //set car position
    car_pos.x = 80.0*Math.sin(-track_pos/100.0*2*Math.PI);
    if(track_pos < 12.5  || (track_pos >= 87.5))  // inner straight line
        car_pos.z = 0.0;
    else if ((track_pos > 37.5) && (track_pos <= 62.5)) // outer straight line
        car_pos.z = -80.0;
    else if (track_pos < 62.5)                  //first curve
        car_pos.z = -40.0+40.0*Math.cos(-(track_pos-12.5)/50.0*2*Math.PI);
    else
        car_pos.z = -40.0+40.0*Math.cos(-(track_pos-37.5)/50.0*2*Math.PI);

    t.translation.set(car_pos);

    ////////////////////
    //set car rotation
    if(track_pos < 12.5  || (track_pos >= 87.5))  // inner straight line
        car_rot.angle = 0.0;
    else if ((track_pos > 37.5) && (track_pos <= 62.5)) // outer straight line
        car_rot.angle = Math.PI;
    else if (track_pos < 62.5)                  //first curve
        car_rot.angle = -(track_pos-12.5)/50.0*2*Math.PI;
    else
        car_rot.angle = -(track_pos-37.5)/50.0*2*Math.PI;

    t.rotation.set(car_rot);

    //////////////////////
    //reset track_pos
    track_pos += 0.1;
    if(track_pos > 100.0) track_pos = track_pos-100.0;

    if (shouldAnimate)
        window.requestAnimationFrame(animate);
}

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
var car_cam= false;
$(function() {
    $( "#cam_switch" ).button();
    $( "#cam_switch" ).click(function(e) {
        car_cam = e.target.checked;
        switch_cam(car_cam);
    });
});
function switch_cam(car){
    if(car)
        document.getElementById("xmlwindow").setAttribute("activeView","#view2");
    else
        document.getElementById("xmlwindow").setAttribute("activeView","#view1");
}
///////////////////////////////setting color of light:
/*var t = document.getElementById("ls_spot1");
 t.childNodes[1].firstChild.data = "100000 30000 30000";
 console.log(t.childNodes[1].firstChild);*/