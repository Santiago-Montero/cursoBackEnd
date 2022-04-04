const normalizr = require('normalizr')
const { normalize, schema } = normalizr


const blog = [{
    id : 1,
    titulo : "el sol",
    descripcion : "lorem",
    autor : {
        id : 1 ,
        nombre : "juan carlos",
        ciudad : "bolivia"
    },
    comentarios : [
        {
            autor : "yo",
            id : 1,
            contenido : "no me fumo mas este curso de mierda"
        }
    ]
    },
    {
        id : 2,
        titulo : "el luna",
        descripcion : "lorem2",
        autor : {
            id : 1 ,
            nombre : "juan carlos",
            ciudad : "bolivia"
        },
        comentarios : []
    }
]

const autorSchema = new normalizr.schema.Entity('autor')
const comentariosSchema = new normalizr.schema.Entity('comentarios')
const postSchema = new normalizr.schema.Entity('posts', {
    autor : autorSchema,
    comentarios : [comentariosSchema]
})

const normalizedBlogpost = normalizr.normalize(blog , [postSchema])

console.log(JSON.stringify(normalizedBlogpost))
/*
{"entities":{"posts":{"undefined":{"0":{"id":1,"titulo":"el sol","descripcion":"lorem","autor":{"id":1,"nombre":"juan carlos","ciudad":"bolivia"},"comentarios":[{"autor":"yo","id":1,"contenido":"no me fumo mas este curso de mierda"}]},"1":{"id":2,"titulo":"el luna","descripcion":"lorem2","autor":{"id":1,"nombre":"juan carlos","ciudad":"bolivia"},"comentarios":[]}}}}}
*/

const util = require('util')

function imprimir (obj){
    console.log(util.inspect(obj, false, 12, true))
}
imprimir(normalizedBlogpost)

/*
{
  entities: {
    posts: {
      undefined: {
        '0': {
          id: 1,
          titulo: 'el sol',
          descripcion: 'lorem',
          autor: { id: 1, nombre: 'juan carlos', ciudad: 'bolivia' },
          comentarios: [
            {
              autor: 'yo',
              id: 1,
              contenido: 'no me fumo mas este curso de mierda'
            }
          ]
        },
        '1': {
          id: 2,
          titulo: 'el luna',
          descripcion: 'lorem2',
          autor: { id: 1, nombre: 'juan carlos', ciudad: 'bolivia' },
          comentarios: []
        }
      }
    }
  },
  result: undefined
}*/