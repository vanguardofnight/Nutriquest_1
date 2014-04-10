var bioHarness : GameObject;
var control : BioHarnessController;

function Start() 
{
	Screen.autorotateToLandscapeRight = true;
	/* Uncomment this before extracting Unity Android Project 
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
	*/
}

function OnMouseDown(){
	if(gameObject.name == "Connect_Texture") {
		Debug.Log("CT");
		control.connect();
	}	
	if(gameObject.name == "Disconnect_Texture") {
		Debug.Log("DT");
		control.disconnect();
	}
	if(gameObject.name == "Mainmenu_Texture") {
		Debug.Log("MT");
		Application.LoadLevel("intro");
	}
}

function OnGUI()
{
	if(gameObject.name == "Log_Txt") {
		this.guiText.text = "- System Log: ";
//		this.guiText.text = "- System Log: " + control.GetLog();
	}
}