use rand::distributions::{Distribution, Uniform};
use rand::seq::SliceRandom;
use serde_derive::Deserialize;
use serde_derive::Serialize;
use wasm_bindgen::prelude::*;

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
#[wasm_bindgen]
pub struct Operation {
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
pub fn generate_addition(addition: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let adds: Operation = addition.into_serde().unwrap();
    let first_value = Uniform::from(adds.firstStart..adds.firstEnd + 1);
    let second_value = Uniform::from(adds.secondStart..adds.secondEnd + 1);

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
pub fn generate_multiplication(multiplication: JsValue) -> JsValue {
    let mut rng = rand::thread_rng();
    let adds: Operation = multiplication.into_serde().unwrap();
    let first_value = Uniform::from(adds.firstStart..adds.firstEnd + 1);
    let second_value = Uniform::from(adds.secondStart..adds.secondEnd + 1);

    let first = first_value.sample(&mut rng);
    let second = second_value.sample(&mut rng);

    let equation = &Equation {
        first,
        second,
        operator: '*',
        answer: first * second,
    };

    return JsValue::from_serde(equation).unwrap();
}

#[wasm_bindgen]
pub fn generate_order() -> JsValue {
    let mut rng = rand::thread_rng();
    let mut array: [usize; 24] = [0; 24];
    for i in 0..24 {
        array[i] = i;
    }
    array.shuffle(&mut rng);
    return JsValue::from_serde(&array).unwrap();
}
