//Traits___________________________


// struct Circle{
//     x:f64,
//     y:f64,
//     radius:f64
// }

// trait HasArea{
//     fn area(&self)->f64;
// }
//  impl HasArea for Circle{
//     fn area(&self)->f64{
//         3.14*(self.radius*self.radius)
//     }
//  }
//  fn print_area<T:HasArea>(shape:T){
//     println!("this shape has an area of {}",shape.area())
// }

struct Rectangle<T>{
    width:T,
    height:T,
}

impl <T:PartialEq> Rectangle<T>{
    fn is_sqaure(&self)->bool{
        self.width==self.height
    }
}

fn main(){
    // let c=Circle{
    //     x:0.0f64,
    //     y:0.0f64,
    //     radius:4.0f64,
    // };
    // print_area(c);
    let mut r=Rectangle{
        width:47,
        height:47,
    };
   println!("{:?}",r.is_sqaure());

   


}
























//Genrics______________________________________
// struct Point<T>{
//     x:T,
//     y:T,
//     c:T,
// }

// fn main(){
//     let integer=Point{
//         x:5,y:10.11
//     }
//     let float=Point{
//         x:1.0,y:2.0
//     }
// }















// fn main(){
//     let number_list=vec![34,50,25,100,65];
//     let result=largest(&number_list);
//     println!("{}",result);

//     let char_list=vec!['i','m','a','y','q'];
//     let result=largest(&char_list);
//     println!("that lagest char  from array  is :{}",result);

// }
// fn largest<T>(list:&[T])->&T{
//     let mut largest=&list[0];

//     for i in list{
//         if i>largest{
//     largest=i;
//     }   
//  }
//  largest

// }

// fn largest_i32(list:&[i32])->&i32{
//     let mut largest=&list[0];

//     for i in list{
//         if i>largest{
//     largest=i;
//     }   
//  }
//  largest
// }

// fn largest_char(list :&[char])->&char{
//     let mut largest=&list[0];

//     for i in list{
//         if i>largest{
//     largest=i;
//     }   
//  }
//  largest


//}