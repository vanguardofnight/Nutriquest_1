// Flag for preventing making duplicate gameobject
private static var created : boolean = false;

// This is the Unity-Android interface
private var curActivity : AndroidJavaObject;

private static var strLog : String;
private static var heartRate : String = "0";
private static var respirationRate : String = "0";
private static var skinTemperature : String = "0";
private static var posture : String = "0";
private static var peakAcceleration : String = "0";

private static var normalRate : float = 16.0;
private static var avg: float = 0;

var bhEnabled : boolean;
var connected : boolean;

private var timer : float;

function Start(){
	bhEnabled = true;
	if (bhEnabled) {
		var jc : AndroidJavaClass = new AndroidJavaClass("com.unity3d.player.UnityPlayer");
		// What's differnent from C#: add '.' between GetStatic and <>.
		curActivity = jc.GetStatic.<AndroidJavaObject>("currentActivity");
	}
	
	timer = Time.time;
	strLog = "Initialized";
}

function Awake(){
	if(!created) {
	 	DontDestroyOnLoad (this);
	 	created = true;
 	} else {
 		Destroy(this.gameObject);
 	}
}

function OnConnected ( str : String ) {
	connected = true;
}

function OnDisconnected ( str: String) {
	connected = false;
}

function InitRecord() {
	avg = 0;
}

function Record ( str : String ){
	if ((timer + 2.0) < Time.time) {
		avg = (avg + parseFloat(str) ) / 2;
		timer = Time.time;
	}
}

function GetAvg() : float {
	return avg;
}

function SetLog(str : String) {
	this.strLog = str;
}

function SetHeartRate(str : String) {
	this.heartRate = str;
}

function SetRespirationRate(str : String) {
	this.respirationRate = str;
	Record ( str );
}

function SetSkinTemperature(str : String) {
	this.skinTemperature = str;
}

function SetPosture(str : String) {
	this.posture = str;
}

function SetPeakAcceleration(str : String) {
	this.peakAcceleration = str;
}

function GetLog() : String {
	return strLog;
}

function GetHeartRate() : String {
	return heartRate;
}

function GetRespirationRate() : String {
	return respirationRate;
}

function GetSkinTemperature() : String {
	return skinTemperature;
}

function GetPosture() : String {
	return posture;
}

function IsConnected() : boolean {
	return connected;
}

function GetPeakAcceleration() : String {
	return peakAcceleration;
}

function connect(){
		curActivity.Call("connect");
}

function disconnect(){
		curActivity.Call("disconnect");
}

function Update() {
	
}