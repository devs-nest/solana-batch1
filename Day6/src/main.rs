fn main(){
    //unsigned integer
// //u8,u16,u32,u64,u128
//     let unsigned:u8=27;

//      //signed integer
//      //i8,i16,i32,i64,i128
//      let signed:i8=10;

// //     float is used for decimal
//     let float:f32=1.2;

// //     //cha
//    let letter='a';
// //     //bool
//    let is_ture:bool=true;

//    println!("us:{},i:{},float:{},letter:{},is_ture:{}",unsigned,signed,float,letter,is_ture);


     let arr: [i32; 7] = [1, 2, 3, 4, 5,6,7];

 println!("index :{}, leangth:{}",arr[3],arr.len());

// println!("{:?}",arr);

// //tuple
 let age: (i32, f64, u8) = (500, 6.4, 1);

 let number:(u32,f32,i32)=(23,4.7,3);
 println!("{}",number.0);


   // println!("The value of y is: {y}");

}
