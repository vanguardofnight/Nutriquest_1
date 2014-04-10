var bioHarness : GameObject;
var control : BioHarnessController;

function Start() 
{
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
}

function OnMouseDown(){
	control.connect();
	control.SetRespirationRate(control.GetRespirationRate() + 1);
}

function OnGUI()
{
	GUI.Label( Rect(300, 260, 100, 100), control.GetLog() );
	GUI.Label( Rect(300, 310, 100, 100), control.GetRespirationRate() );
}