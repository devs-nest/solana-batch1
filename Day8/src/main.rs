use std::collections::HashMap;
fn main(){
 let mut score=HashMap::new();
 score.insert(String::from("Blue"),10);
 score.insert(String::from("yellow"),50);


for (key,value) in &score{
    println!("key {} and value{}",key,value);
}
}