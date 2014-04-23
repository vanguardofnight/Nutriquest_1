function Start() 
{
 	Screen.orientation = ScreenOrientation.LandscapeLeft;
}

function OnMouseDown(){
	if(gameObject.name == "Newgame_Texture" || gameObject.name == "Newgame_Txt") {
		Application.LoadLevel("lvl1");
	}	
	if(gameObject.name == "Levelselect_Texture" || gameObject.name == "Levelselect_Txt") {
		Application.LoadLevel("lvlselect");
	}
	if(gameObject.name == "Options_Texture" || gameObject.name == "Options_Txt") {
		Application.LoadLevel("settingsmenu");
	}
}