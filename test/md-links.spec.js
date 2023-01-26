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

const {mdLinks} = require('../md-links.js')

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
 /*  it('Debería retornar una promesa', () => {
     expect(leerarchivo('./adriana-md/hola.md')).toBeInstanceOf(Promise)
   });
/*  it('Retornaria una promesa Rechazada si no existe ruta',  () => {
   return expect(leerarchivo('C:\\Users\\manue\\Desktop\\angy-md\\hola.mmd')).rejects.toEqual('lo siento ocurrio un Error')
});  */ 
it('Retornaria una promesa rechazada si la ruta no existe',() => {
  console.log(leerarchivo(rutaabsfile))
  return expect(leerarchivo("./adriana-md/pruebatest.md")).rejects.toEqual('lo siento ocurrio un Error') 
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

// VALIDATELINKS TEST
describe("validatelinks", () => {
  beforeAll(() => {
    const mockFetch = jest
      .fn()
      .mockResolvedValueOnce({ status: 200, ok: true })
      .mockResolvedValueOnce({ status: 400, ok: false })
      .mockRejectedValueOnce({ status: 'link roto', ok: false });
    global.fetch = mockFetch;
  });
  
  it("debe retornatar un array con obj y status:200", () => {
    const arrayobj = [{
      href: 'https://www.twitch.tv/midudev',
       
    }]
    return validateLinks(arrayobj).then((result) => { console.log(result)
      expect([{ "href":'https://www.twitch.tv/midudev',"ok": "ok", "status": 200 }]).toEqual(result)
  })
})
it("debe retornatar un array con obj y status:400", () => {
  const arrayobj = [{
    href: 'https://www.twitch.tv/midudev',
     
  }]
  return validateLinks(arrayobj).then((result) => { console.log(result)
    expect([{ "href":'https://www.twitch.tv/midudev',"ok": "fail", "status": 400 }]).toEqual(result)
})
})
it("debe rechazar si no hay respuesta", () => {
  const arrayobj = [{
    href: 'https://www.twitch.tv/midudev',
     
  }]
  return validateLinks(arrayobj).catch((result) => { console.log(result)
    expect([{ "href":'https://www.twitch.tv/midudev',"ok": "fail", "status": 'link roto' }]).toEqual(result)
})
})
})
 
// TEST ESTADISTICA,BROKEN, 
describe('Links unicos',  () => {
   it('muestra la cantidad total de links',() => {
      const links = [
        "https://www.instagram.com/comesanomcbo/",
        "https://www.instagram.com/ironparadisefitness2022/",
        "https://www.instagram.com/laboratoriala/",
        "https://www.instagram.com/cristiano/"
        ]
        const obj = {
          total: 4,
          unique: 1, 
        }
      expect(estadistica(links)).toEqual(obj)
  })
} );
  describe('Links rotos', () => {
    it('muestra la cantidad de links rotos',() => {
        const links = [
          "https://www.instagram.com/c/as/",
          "https://www.instagram.com/c/as",
          ]
          const obje = {
            total: 2,
            broken: 0, 
            unique: 1,
          }
        expect(broken(links)).toEqual(obje)
    })
  });

  /*   //MD LINKS TEST
   describe('mdLinks', () => {
   
  it('Deberia retornar un array de obj con las propiedas status y ok ,', async () => {
      const arr = [
        {
          href: 'https://www.twitch.tv/midudev',
          text: 'Twitch',
          file: `C:\\Users\\manue\\Desktop\\CARD VALIDETION\\md-links\\DEV001-md-links\\readme.md`,
        },
      ];
     await expect(mdLinks(arr[0].file, {validate:true})).resolves.toEqual(arr)
    });
  });   */