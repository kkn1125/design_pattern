const { group } = require("console");

class Car {
  move(x, y) {}

  stop() {}

  operation() {}
}

class BMW extends Car {
  name = "bmw";
  constructor() {
    super();
  }

  move(x, y) {
    console.log("[%s] x로 %d, y로 %d 움직임", this.name, x, y);
  }

  operation() {
    return "BMW";
  }
}

class BENZ extends Car {
  name = "benz";
  constructor() {
    super();
  }

  move(x, y) {
    console.log("[%s] x로 %d, y로 %d 움직임", this.name, x, y);
  }

  operation() {
    return "BENZ";
  }
}

class CompoundCar extends Car {
  carList = [];
  add(car) {
    if (car instanceof Car) this.carList.push(car);
    if (car instanceof Array) this.carList.push(...car.carList);
  }
  remove(car) {
    const index = this.carList.findIndex((item) => item === car);
    if (index > -1) this.carList.splice(index, 1);
  }
  move(x, y) {
    // CompoundCar에 move와 단일 차(benz, bmw등)이 모두 move를 가짐.
    // CompoindCar의 move는 carList를 순회하면서 move하기 때문에 배열에 BMW든 CompoundCar객체든 동일하게 move를 사용 가능.
    this.carList.forEach((car) => {
      car.move(x, y);
    });
  }
  operation() {
    const result = [];
    for (const child of this.carList) {
      result.push(child.operation());
    }
    return `Car(${result.join("+")})`;
  }
}

class CarShop {
  all = null;
  load() {
    this.all = new CompoundCar();
    this.all.add(new BMW());
    this.all.add(new BENZ());
  }
  groupSelected(components) {
    const group = new CompoundCar();
    for (let component of components) {
      group.add(component);
      this.all.remove(component);
    }
    this.all.add(group);
    this.all.move(2, 3);
  }
  operation() {
    console.log(this.all.operation());
  }
}

const carshop = new CarShop();
carshop.load();
carshop.groupSelected([new BENZ(), new BENZ(), new BMW()]);
carshop.operation();

/**
 * composite pattern은 복합 구조를 사용할 때 유용하다. 단순히 말하면 단일과 단일이 여럿 묶인 그룹을 한 번에 사용하고자 할 때 기존에는 개별적으로 for문을 돌리거나 해야하는데, 클래스 객체가 동일한 메서드를 가지면서 배열 상황에서 어떻게 그룹이 되던 알아서 계단식으로 타고 들어가 해당 메서드를 동일하게 실행시킨다.
 * [A, [A,A,[A,A]]]인 상황에서 B라는 메서드를 실행하려면 for문으로 순회하면서 재귀함수 등을 사용하지만 컴포짓 패턴을 사용하면 최상위 배열 객체에 B메서드만 실행해주면 하위 배열들이 알아서 상속된 B메서드를 실행하면서 모두 실행시킨다.
 */
