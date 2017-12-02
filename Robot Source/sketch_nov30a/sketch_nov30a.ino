#include <IRremote.h>
#include <IRremoteInt.h>

int RECV_PIN = 2;
IRsend irsend;
IRrecv irrecv(RECV_PIN);
decode_results results;
char in_byte;

void setup()
{
  Serial.begin(9600);
  irrecv.enableIRIn();
  in_byte = 'z';

}

void loop() {
  if(Serial.available() > 0){
    in_byte = Serial.read();
  }
  if(in_byte == 'x'){
    irsend.sendSony(0xa90, 12);
    Serial.println("fuck you");
  }
  if(irrecv.decode(&results)) {
    Serial.println("fuck you too");
    irrecv.resume();
  }
  in_byte='z';
}
 
