use rand::distributions::{Distribution, Uniform};
use wasm_bindgen::prelude::*;

use rand::seq::SliceRandom;
use serde_derive::Deserialize;
use serde_derive::Serialize;

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Addition {
    enabled: bool,
    firstEnd: u32,
    firstStart: u32,
    secondEnd: u32,
    secondStart: u32,
}

#[derive(Serialize, Deserialize)]
pub struct Equation {
    first: u32,
    second: u32,
    operator: char,
    answer: u32,
}

#[wasm_bindgen]
pub fn generate_equation(addition: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let adds: Addition = addition.into_serde().unwrap();
    let first_value = Uniform::from(adds.firstStart..adds.firstEnd);
    let second_value = Uniform::from(adds.secondStart..adds.secondEnd);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);

    let equation = &Equation {
        first,
        second,
        operator: '+',
        answer: first + second,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_order() -> JsValue {
    let mut rng = rand::thread_rng();
    let mut array: [u32; 9] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    array.shuffle(&mut rng);
    return JsValue::from_serde(&array).unwrap();
}
