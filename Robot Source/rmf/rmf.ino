#include <Servo.h>
#include <IRremote.h>
#include <IRremoteInt.h>

#define PIN_DETECT 4
/**
*
*@author Kevin Haan and Ryan Pals
*
*/

class SuperServo{
      Servo servo;              // the servo
      int pos;              // current servo position 
      int increment;        // increment to move for each interval
      int  updateInterval;      // interval between updates
      unsigned long lastUpdate; // last update of position
     
    public: 
      SuperServo(int interval)
      {
        updateInterval = interval;
        increment = 0;
      }
      
      void Attach(int pin)
      {
        servo.attach(pin);
      }
      
      void Detach()
      {
        servo.detach();
      }
      void setInc(int inc){
        increment = inc;
      }
      int getInc(){
        return increment;
      }
      void Update()
      {
        if((millis() - lastUpdate) > updateInterval)  // time to update
        {
          lastUpdate = millis();
          if ((pos < 180 && increment == 1) || (pos>0 && increment == -1)){
            pos += increment;
          }
          servo.write(pos);
          //Serial.println(pos);

        }
      }
};


/************************/
/*** PIN ASSIGNMENTS  ***/
/************************/
int DIR_A = 12;
int DIR_B = 13;
int BRAKE_A = 9;
int BRAKE_B = 8;
int PWM_A = 3;
int PWM_B = 11;
int SERVO_PIN_A = 6;
int SERVO_PIN_B = 5;

int it = 0;
int beenASecond = 1;

int PIN_IR = 10;
int PIN_FLAME_DIG = 4; 
int PIN_FLAME_AN = A0; 

//number of times the IR thing has been hit
int damage = 0;
int hitVal;
char InByte;
int speed; 
SuperServo servo_A(15);
SuperServo servo_B(15);

char msg[20];
void setup()
{
 Serial.begin(9600);

 pinMode(DIR_A, OUTPUT);
 pinMode(BRAKE_A, OUTPUT);
 pinMode(PWM_A, OUTPUT);   
 pinMode(DIR_B, OUTPUT);
 pinMode(BRAKE_B, OUTPUT);
 pinMode(PWM_B, OUTPUT);
 pinMode(PIN_IR, OUTPUT);
 servo_A.Attach(6);
 servo_B.Attach(5);
 speed = 75;
 
 stop_A();
 stop_B();
 //delay(500);

  //IR STUFF
  //irrecv.enableIRIn();
}

void loop()                     // run over and over again
{
  
  if ((beenASecond == 1) && (digitalRead(PIN_DETECT) == LOW)) {

    //if (((damage % 10) == 0)){
      sprintf(msg, "Damage: %d\n", damage);
      int bytesWritten = Serial.write(msg);
      if (damage > 1500){
        speed = 0;
      }
      if (damage > 1000){
        speed = 10;
      }
      else {
        speed = (75 - (damage * 0.05));
      }
    //}
    damage++;
    beenASecond = 0;
    
  }
  
  if(Serial.available() > 0){
    InByte = Serial.read();
    check_Movement(InByte);
    check_Servo(InByte);
    check_Fire(InByte);
    //speed_Adjust();
    
  }
  
  if(servo_A.getInc() != 0){
     servo_A.Update();
  }
  if(servo_B.getInc() != 0){
     servo_B.Update();
  }

  if ((it % 10000) == 0){
    it = 0;
    beenASecond = 1;
  }
  else {
    beenASecond = 0;
    it++;
  }
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

void check_Servo(char InByte){
  switch(InByte){
    case 'L':
        servo_A.setInc(-1);
        
      break;
    case 'l':
        servo_A.setInc(0);
        
      break;
    case 'J':
        servo_A.setInc(1);
        
      break;
    case 'j':
        servo_A.setInc(0);
        
      break;
    case 'M':
        servo_B.setInc(1);
        
      break;
    case 'm':
        servo_B.setInc(0);
        
      break;
    case 'I':
        servo_B.setInc(-1);
        
      break;
    case 'i':
        servo_B.setInc(0);
        
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
  if(InByte == 'q'){
    digitalWrite(DIR_A, LOW);
    digitalWrite(DIR_B, LOW);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed/2);
    analogWrite(PWM_B, speed);
  }
  if(InByte == 'e'){
    digitalWrite(DIR_A, LOW);
    digitalWrite(DIR_B, LOW);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed/2);
  }
  if(InByte == 'z'){
    digitalWrite(DIR_A, HIGH);
    digitalWrite(DIR_B, HIGH);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed/2);
    analogWrite(PWM_B, speed);
  }
  if(InByte == 'c'){
    digitalWrite(DIR_A, HIGH);
    digitalWrite(DIR_B, HIGH);
    digitalWrite(BRAKE_A, LOW);
    digitalWrite(BRAKE_B, LOW);
    analogWrite(PWM_A, speed);
    analogWrite(PWM_B, speed/2);
  }
  if(InByte == 'x'){
    stop_A();
    stop_B();
  }
}
/*
void speed_Adjust(){
  if(InByte == '+'){
    speed = 225;
  }
  else if(InByte == '-'){
    speed = 50;
  }  
  else if(InByte == '0'){
    speed = 100;
  }
}
*/
void check_Fire(char inByte){
  if (inByte == 'K'){
    digitalWrite(PIN_IR, HIGH);
    delay(1000);
    digitalWrite(PIN_IR, LOW);
  }
}

void check_Hit(){
    hitVal = digitalRead(PIN_DETECT);
    if(hitVal== HIGH){
      Serial.println("damage received");
    }

    //irrecv.resume();
    //irrecv.enableIRIn();
    delay(200);

  }
}


