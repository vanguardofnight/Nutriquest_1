function Start() 
{
	Screen.autorotateToLandscapeRight = true;
}

function OnMouseDown(){
	if(gameObject.name == "Level1_Texture" || gameObject.name == "Level1_Txt") {
		Application.LoadLevel("lvl1");
	}	
	if(gameObject.name == "Level2_Texture" || gameObject.name == "Level2_Txt") {
		Application.LoadLevel("lvl2");
	}
	if(gameObject.name == "Level3_Texture" || gameObject.name == "Level3_Txt") {
		Application.LoadLevel("lvl3");
	}
	if(gameObject.name == "Level4_Texture" || gameObject.name == "Level4_Txt") {
		Application.LoadLevel("lvl4");
	}
	if(gameObject.name == "Mainmenu_Texture" || gameObject.name == "Mainmenu_Txt") {
		Application.LoadLevel("intro");
	}
}