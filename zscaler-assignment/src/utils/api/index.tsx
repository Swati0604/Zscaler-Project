import {attackersData} from '../data'

export function fetchAttackersData() {
    return new Promise((resolve, reject) => {
     setTimeout(()=> {
       resolve(attackersData)

     }, 3000)
      // wait 3 seconds before resolving
    });
  }