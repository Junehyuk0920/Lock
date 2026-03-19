void setup()
{
  Serial.begin(9600);
}

int p1 = 0, p2 = 0, p3 = 0;

void loop()
{
  p1 = map(analogRead(A0), 10, 1010, 0, 40);
  p2 = map(analogRead(A1), 10, 1010, 0, 40);
  p3 = map(analogRead(A2), 10, 1010, 0, 40);

  Serial.print(p1);
  Serial.print(",");
  Serial.print(p2);
  Serial.print(",");
  Serial.println(p3);

  delay(500);
}
