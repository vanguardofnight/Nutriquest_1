var bioHarness : GameObject;
var control : BioHarnessController;

function Start() 
{
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
}

function OnMouseDown(){
	/* Uncomment this before extracting Unity Android Project 
	control.connect();
	*/
}

function OnGUI()
{
	GUI.Label( Rect(300, 260, 100, 100), control.GetLog() );
	GUI.Label( Rect(300, 310, 100, 100), control.GetRespirationRate() );
}