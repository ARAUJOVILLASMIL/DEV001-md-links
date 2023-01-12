const {
  convertirruta,
  rutaabsoluta,
  existeruta, 
  rutadirectorio,
  leerdirectorio,
  filtrarmd,
  getLinks,
  leerarchivo,
} = require('../API.js')
//describe ('mdLinks', () => {

// TEST FUNCION EXISTE RUTA 
describe('existe la ruta', () => {
  it('deberia ser una funcion', () => {
    expect(typeof existeruta).toBe('function')
  });
  it('debe ser true si la ruta existe', () =>{ 
  expect(existeruta('../adriana-md/hola.md')).toBe(true)
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
    expect(rutaabsoluta('C:\\Users\\manue\\Desktop\\adriana-md')).toStrictEqual(true);
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
    expect(rutadirectorio('C:\\Users\\manue\\Desktop\\adriana-md')).toStrictEqual(true);
  });
  it('Retornar false si la ruta no es un directorio', () => {
    expect(rutadirectorio('../adriana-md/hola.md')).toBe(false);
  });
});

//TEST PARA LEER UN ARCHIVO
describe ('leerarchivo', () => {
  it('Debe ser una funcion', () => {
    expect(typeof leerarchivo ).toBe('function')
    })
  it('Debería retornar una promesa', () => {
    expect(leerarchivo('./adriana-md/hola.md')).toBeInstanceOf(Promise)
   });
  
});
//TEST LEER DIRECTORIO

describe ('leerdirectorio', () => {
  it('Debe ser una funcion', () => {
    expect(typeof leerdirectorio ).toBe('function')
    })
    it('Debe retornar true si lee directorio', () => {
      expect(leerdirectorio ('../adriana-md')).toBe(true);
    });
  });
  

//TEST CONVERTIR RUTA//
describe('Convertir ruta', () => {
  it('Debe ser una funcion', () => {
    expect(typeof convertirruta ).toBe('function')
    })
    const Rabsoluta = 'C:\\Users\\manue\\Desktop\\CARD VALIDETION\\md-links\\adriana-md\\hola.md'

  it('Retorna true si es una ruta absoluta', () => {
    expect(convertirruta('../adriana-md/hola.md')).toStrictEqual(Rabsoluta);
  });
});

//TEST FILTRARMD
describe('FiltrarMD', () => {
  it('deberia ser una funcion', () => {
    expect(typeof filtrarmd).toBe('function')
  
    });
    it('Retorna archivos MD', () => {
      expect(convertirruta('../adriana-md/hola.md')).toStrictEqual();
    });
  });

  //TEST getLinks
describe('GETLINKS', () => {
  it('deberia ser una funcion', () => {
    expect(typeof getLinks).toBe('function')
  
    });
    it('Debería retornar una promesa', () => {
      expect(getLinks('./adriana-md/hola.md')).toBeInstanceOf(Promise)
    });
  });
  
