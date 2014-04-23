var bioHarness : GameObject;
var control : BioHarnessController;

function Start() 
{
	Screen.autorotateToLandscapeRight = true;
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
}

function OnMouseDown(){
	if(gameObject.name == "Connect_Texture" || gameObject.name == "Connect_Txt") {
//		Debug.Log("CT");
		control.connect();
	}	
	if(gameObject.name == "Disconnect_Texture" || gameObject.name == "Disconnect_Txt") {
//		Debug.Log("DT");
		control.disconnect();
	}
	if(gameObject.name == "Mainmenu_Texture" || gameObject.name == "Mainmenu_Txt") {
//		Debug.Log("MT");
		Application.LoadLevel("intro");
	}
}

function OnGUI()
{
	if(gameObject.name == "Log_Txt") {
		this.guiText.text = "- System Log: " + control.GetLog();
	}
}