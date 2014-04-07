#pragma strict


function Start () {
		OnGUI();
}


function OnGUI(){
	GUI.backgroundColor = Color.blue;
	GUI.contentColor = Color.yellow;
	GUI.skin.button.fontSize = 28;
	//Begins at tutorial level
	if(GUI.Button(new Rect( 50, Screen.height % 4 + 100 , 600, 200), "Connect Bioharness")){
		//connect bioharness 
	}
	//Navigates to main menu	
	if(GUI.Button(new Rect( 50, Screen.height % 4 + 310, 600, 200), "Main Menu")){
		Application.LoadLevel("intro");
	}
	
};
function Update () {

}