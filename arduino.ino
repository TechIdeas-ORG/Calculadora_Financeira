#define CHAVE_PIN 7

void setup() {
    pinMode(CHAVE_PIN, INPUT);
    Serial.begin(9600);
}

void loop(){
    int chave = digitalRead(CHAVE_PIN);

    if(chave == 0){
        Serial.print("1");

    }
    else{
        Serial.print("0");
    }

    Serial.println();

}