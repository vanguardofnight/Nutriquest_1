#pragma strict

private var PlayerScore = 0;

function Start () {
}

function OnGUI() {
	GUI.Label(Rect(0, 0, 256, 128), "Score: " + PlayerScore);
}

function Update () {
}

function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Water")
	{
		Destroy(other.gameObject);
		PlayerScore += 1;
	}
	if(other.tag == "JunkFood")
	{
		Destroy(other.gameObject);
		PlayerScore -= 1;
	}
	
	if(other.tag == "Dairy"){
		Destroy(other.gameObject);
		PlayerScore += 1;
	}
	
	if( other.tag == "Fruit"){
		Destroy(other.gameObject);
		PlayerScore += 1;
	}
	
	
}