#include <Servo.h>
#include <IRremote.h>
#include <IRremoteInt.h>



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

char robotType = "C";
//int PIN_IR = 10;

//number of times the IR thing has been hit
int damage = 0;

char InByte;
int speed; 
SuperServo servo_A(15);
SuperServo servo_B(15);

IRsend irsend;
IRrecv irrecv(4);
decode_results results;

void setup()
{
 Serial.begin(9600);

 pinMode(DIR_A, OUTPUT);
 pinMode(BRAKE_A, OUTPUT);
 pinMode(PWM_A, OUTPUT);   
 pinMode(DIR_B, OUTPUT);
 pinMode(BRAKE_B, OUTPUT);
 pinMode(PWM_B, OUTPUT);
// pinMode(PIN_IR, OUTPUT);
 servo_A.Attach(6);
 servo_B.Attach(5);
 speed = 100;
 
 stop_A();
 stop_B();
 delay(500);

  //IR STUFF
  irrecv.enableIRIn();
}

void loop()                     // run over and over again
{
  if(Serial.available() > 0){
    InByte = Serial.read();
    check_Movement(InByte);
    check_Servo(InByte);
    check_Fire(InByte);
    speed_Adjust();
    
  }
  /*
  if(irrecv.decode(&results)) {
    
    damage++;
    char msg[20];
    sprintf(msg, "Damage: %d\n", damage);
    int bytesWritten = Serial.write(msg);
    if (damage > 15){
      speed = 0;
    }
    if (damage > 10){
      speed = 10;
    }
    else {
      speed = (100 - (damage * 5));
    }

  irrecv.resume();

  }
  */
  if(servo_A.getInc() != 0){
     servo_A.Update();
  }
  if(servo_B.getInc() != 0){
     servo_B.Update();
  }
  //IR Stuff  
  //if the ir sensor goes off, increase damage
  
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

void check_Fire(char inByte){
  if (inByte == 'K'){
    if (robotType == "C"){
      //pin write mode
      //digitalWrite(PIN_IR, LOW);
    }
    else {
      for (int i = 0; i < 3; i++) {
        irsend.sendSony(0xa90, 12); // Sony TV power code
        delay(100);
      }
    }
  }
  if (inByte == 'k'){
      if (robotType == "C"){
        //pin write mode
        //digitalWrite(PIN_IR, HIGH);
      }
  }
}
