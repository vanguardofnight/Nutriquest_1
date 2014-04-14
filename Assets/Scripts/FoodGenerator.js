#pragma strict

var maxTimer : int = 10;
// Timers for respawning 6 food items
var arr_timers : int[];
var arr_maxTimers : int[];

// Stored food objects
var arr_objects : GameObject[];

// Stored prefab names
var arr_prefabs : String[];

function Start () {
	arr_timers = new int[6];
	arr_maxTimers = new int[6];
	
	for(var i = 0; i < 6; i++){
		arr_maxTimers[i] = Random.Range(5, maxTimer);
		arr_timers[i] = arr_maxTimers[i];
	}
	
	arr_objects = new GameObject[6];
	
	arr_prefabs = new String[10];
	arr_prefabs[0] = "lv4_gf_apple";
	arr_prefabs[1] = "lv4_gf_banana";
	arr_prefabs[2] = "lv4_gf_bread";
	arr_prefabs[3] = "lv4_gf_milk";
	arr_prefabs[4] = "lv4_gf_steak";
	arr_prefabs[5] = "lv4_bf_cake_1";
	arr_prefabs[6] = "lv4_bf_cake_2";
	arr_prefabs[7] = "lv4_bf_candy_corn";
	arr_prefabs[8] = "lv4_bf_chocolate_chip_cookie";
	arr_prefabs[9] = "lv4_bf_icecream_1";
	
	InvokeRepeating("CountDown", 1.0, 1.0);
}

function Update () {
}

function CountDown (){
	for(var i=0; i< 6; i++) {
		if(arr_timers[i] == arr_maxTimers[i]){
			arr_objects[i] = Instantiate(Resources.Load(arr_prefabs[Random.Range(0,9)]), RandVec3(i), Quaternion.identity);
			arr_timers[i]--;
		} else if(arr_timers[i] <= 0){
			arr_maxTimers[i] = Random.Range(5, maxTimer);
			arr_timers[i] = arr_maxTimers[i];
			if(arr_objects[i] != null) {
				Destroy(arr_objects[i]);		
			} else {
				// Do Nothing
			}
		} else {
			arr_timers[i]--;
		}
	}
}

function RandVec3(i){
	/*
	Ranges (minX, maxX, minY, maxY)
	Spot 0: (-5, 3, -0.5, 0.5)
	Spot 1: (-2, 8, 4, 6)
	Spot 2: (10, 3, -0.5, 0.5)
	Spot 3: (10, 20, 5.5, 7.5)
	Spot 4: (-7.5, -3, 6.5, 10.5)
	Spot 5: (-2, 20, 12.5, 13.5)
	*/
	var x : float;
	var y : float;
		
	switch(i){
		case 0:
			x = Random.Range(-5.0,3.0);
			y = Random.Range(-0.5,0.5);
			break;
		case 1:
			x = Random.Range(-2.0,8.0);
			y = Random.Range(4.0,6.0);
			break;
		case 2:
			x = Random.Range(10.0,20.0);
			y = Random.Range(-0.5,0.5);
			break;
		case 3:
			x = Random.Range(10.0,20.0);
			y = Random.Range(5.5,7.5);
			break;
		case 4:
			x = Random.Range(-7.5,-3.0);
			y = Random.Range(6.5,10.5);
			break;
		case 5:
			x = Random.Range(-2.0,20.0);
			y = Random.Range(12.5,13.5);
			break;
		}
	return Vector3(x,y,0);
}