#include <SoftwareSerial.h>
#include <Servo.h>

/************************/
/*** USER KEYBINDINGS ***/
/************************/
#define LEGS_UP			0x00000001
#define LEGS_DOWN		0x00000002
#define LEGS_LEFT		0x00000004
#define LEGS_RIGHT	0x00000008

#define EYES_UP			0x00000010
#define EYES_DOWN		0x00000020
#define EYES_LEFT		0x00000040
#define EYES_RIGHT	0x00000080

#define ARMS_UP			0x00000100
#define ARMS_DOWN		0x00000200
#define ARMS_LEFT		0x00000400
#define ARMS_RIGHT	0x00000800


/************************/
/*** PIN ASSIGNMENTS  ***/
/************************/
int DIR_A = 12;
int DIR_B = 13;
int BRAKE_A = 9;
int BRAKE_B = 8;
int PWM_A = 3;
int PWM_B = 11;
int SERVO = 10;

char InByte;
int speed; 
Servo servo;
int posCamX;
 
void setup()
{
 servo.attach(10);
 posCamX = 90;
 servo.write(posCamX);
 pinMode(DIR_A, OUTPUT);
 pinMode(BRAKE_A, OUTPUT);
 pinMode(PWM_A, OUTPUT);   
 pinMode(DIR_B, OUTPUT);
 pinMode(BRAKE_B, OUTPUT);
 pinMode(PWM_B, OUTPUT);

 speed = 125;
 
 stop_A();
 stop_B();
 delay(500);
}

void loop()                     // run over and over again
{
  if(BT.available() > 0){
    InByte = Serial.read()

    check_CamX

    check_Movement(InByte);
    speed_Adjust();
    
 } 
 else if(!Serial.available()){
  stop_A();
  stop_B();
 }
 delay(150);
}



void stop_A(){
  digitalWrite(DIR_A, LOW);
  digitalWrite(BRAKE_A, LOW);
  analogWrite(PWM_A, 0);
}
void stop_B(){
  digitalWrite(DIR_B, LOW);
  digitalWrite(BRAKE_B, LOW);
  analogWrite(PWM_B, 0);
}

void check_CamX(char InByte){
  if(InByte == '9'){
      if(posCamX == 0 ){
        posCamX = 90;
      }
      else if(posCamX == 90){
        posCamX = 180;
      }
      servo.write(posCamX);
    }
    else if(InByte == '8'){
      if(posCamX == 180 ){
        posCamX = 90;
      }
      else if(posCamX == 90){
        posCamX = 0;
      }
      servo.write(posCamX);
    }
}

void check_Movement(char InByte){
  if(InByte == 'w'){
    digitalWrite(DIR_A, LOW);
    digitalWrite(DIR_B, LOW);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed);
  }  
  if(InByte == 's'){
    digitalWrite(DIR_A, HIGH);
    digitalWrite(DIR_B, HIGH);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed);
  }  
  if(InByte == 'd'){
    digitalWrite(DIR_A, LOW);
    digitalWrite(DIR_B, HIGH);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed);
  }
  if(InByte == 'a'){
    digitalWrite(DIR_A, HIGH);
    digitalWrite(DIR_B, LOW);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed);
  }
}
void speed_Adjust(){
  if(InByte == '+'){
    speed = 225;
  }
  else if(InByte == '-'){
    speed = 50;
  }  
  else if(InByte == '0'){
    speed = 125;
  }
}

