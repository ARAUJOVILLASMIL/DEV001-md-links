const {
  convertirruta,
  rutaabsoluta,
  existeruta, 
  rutadirectorio,
  leerdirectorio,
  filtrarmd,
  getLinks,
  leerarchivo,
  validateLinks, 
  broken,
  estadistica,
  
} = require('../API.js')

//const { mdLinks } = require ('../index.js')


// TEST FUNCION EXISTE RUTA 

const dirrutaabsoluta = 'C:\\Users\\manue\\Desktop\\CARD VALIDETION\\md-links\\DEV001-md-links\\test\\adriana-md';
const rutaabsfile = dirrutaabsoluta + '\\pruebatest.md';

describe('existe la ruta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof existeruta).toBe('function')
  });
  it('debe ser true si la ruta existe', () =>{ 
  expect(existeruta(rutaabsfile)).toBe(true)
  })
  it('debe ser false si la ruta no existe', () => {
    expect(existeruta('./adriana-md/prueba123.md')).toBe(false)
    });
  });

  // TEST FUNCION ES ABSOLUTA
describe('ES ruta absoluta', () => {
  it('Debe ser una funcion', () => {
    expect(typeof rutaabsoluta ).toBe('function')
    })
  

  it('debe ser una ruta absoluta', () => {
    expect(rutaabsoluta(dirrutaabsoluta)).toStrictEqual(true);
  });
  it('debe retornar false si la ruta no es absoluta', () => {
    expect(rutaabsoluta('./adriana-md/hola.md')).toBe(false);
  });
});

//TEST PARA SABER SI LA RUTA ES UN DIRECTORIO//
describe('Debe ser un directorio', () => {
  it('Debe ser una funcion', () => {
    expect(typeof rutadirectorio ).toBe('function')
    })
  
  it('Retorna True si la ruta es un directorio', () => {
    expect(rutadirectorio(dirrutaabsoluta)).toStrictEqual(true);
  });
  it('Retornar false si la ruta no es un directorio', () => {
    expect(rutadirectorio(rutaabsfile)).toBe(false);
  });
});

//TEST  LEER UN ARCHIVO
describe ('leerarchivo',() => {
  it('Debe ser una funcion', () => {
    expect(typeof leerarchivo ).toBe('function')
    })
  it('Debería retornar una promesa',async () => {
     await expect(leerarchivo('./adriana-md/hola.md')).toBeInstanceOf(Promise)
   });
 it('Retornaria una promesa Rechazada si no existe ruta',  () => {
   expect(leerarchivo('C:\\Users\\manue\\Desktop\\angy-md\\hola.mmd')).rejects.toEqual('lo siento ocurrio un Error')
}); 
it('Retornaria una promesa Resuelta si la ruta existe ', async() => {
 await expect(leerarchivo(rutaabsfile)).resolves.toEqual('hola test')
 });
});

//TEST LEER DIRECTORIO

describe ('leerdirectorio', () => {
  it('Debe ser una funcion', () => {
    expect(typeof leerdirectorio ).toBe('function')
    })
    it('Debe retornar un array con los archivos', () => {
      const array = ["hola.md","pruebamd.js","pruebatest.md","texto.md"]
      expect(leerdirectorio (dirrutaabsoluta)).toEqual(array);

    });
  });
  

//TEST CONVERTIR RUTA//
describe('Convertir ruta', () => {
  it('Debe ser una funcion', () => {
    expect(typeof convertirruta ).toBe('function')
    })
   
  it('Retorna true si es una ruta absoluta', () => {
    expect(convertirruta('./test/adriana-md')).toStrictEqual(dirrutaabsoluta );
  });
});

//TEST FILTRARMD
describe('FiltrarMD', () => {
  it('deberia ser una funcion', () => {
    expect(typeof filtrarmd).toBe('function')
  
    });
    it('Retorna archivos MD', () => {
      expect(filtrarmd(rutaabsfile)).toStrictEqual('.md');
    });
  });
  
  //TEST GETLINKS
describe('GETLINKS', () => {
  it('deberia ser una funcion', () => {
    expect(typeof getLinks).toBe('function')
  
    });
    it('Debería retornar una promesa', () => {
      expect(getLinks('./adriana-md/hola.md')).toBeInstanceOf(Promise)
    });
  });



  //MD LINKS TEST
  /* describe('md-lnks', () => {
    it('deberia ser una funcion', () => {
      expect(typeof mdLinks ).toBe('function')
    });

    it('Deberia retornar un error si la ruta no existe', async () => {
      await expect(mdLinks('./adriana-md/hola.mmd')).rejects.toEqual('La ruta no existe');
    });
  }); */

// VALIDATELINKS TEST
describe("validatelinks", () => {
  it("debe retornar una promesa",() => {
    const arrayobj = [{
      href: 'https://nodejs.org/',
    }]
    expect(validateLinks(arrayobj)).toBeInstanceOf(Promise)
  });
  it("debe retornatar un array con obj y status", () => {
    const arrayobj = [{
      href: 'https://nodejs.org/',
    }]
    return validateLinks(arrayobj).then(result => expect([{ "href": "https://nodejs.org/","ok": "ok", "status": 200 }]).toEqual(result))
    
  })
})
 


// TEST ESTADISTICA,BROKEN, 
describe('Totalidad de links',  () => {
   it('muestra la cantidad total de links',() => {
      const links = [
        "https://www.instagram.com/comesanomcbo/",
        "https://www.instagram.com/ironparadisefitness2022/",
        "https://www.instagram.com/laboratoriala/",
        "https://www.instagram.com/cristiano/"
        ]
      expect(estadistica(links))
  })
} );

describe('Links rotos', () => {
  it('muestra la cantidad de links rotos',() => {
      const links = [
        "https://www.instagram.com/c/as/",
        "https://www.instagram.com/c/as",
        ]
      expect(broken(links))
  })
} );

    /* it('', () =>{ 
    expect(mdLinks ('./adriana-md/hola.md')).toBe(true)
    })
    it('debe retornar un mensaje, advirtiendo que no hay links', ()=>{
      const resultado = mdLinks('./.md')
      resultado.then((res)=> expect(res).toStrictEqual('no hay links')).catch((rej)=>rej);
      });
    });
    it('Debería retornar una promesa', () => {
      expect(mdLinks ('./adriana-md/hola.md')).toBeInstanceOf(Promise) */
 

      /* describe('Links unicos', () => {
   it('muestra la cantidad de links unicos',() => {
      const links = [
        "https://www.instagram.com/comesanomcbo/",
        "https://www.instagram.com/ironparadisefitness2022/",
        "https://www.instagram.com/laboratoriala/",
        "https://www.instagram.com/cristiano/"
        ]
      expect(unique(links))
  })
} ); */