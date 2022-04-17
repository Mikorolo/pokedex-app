export interface PokemonData {
    id: number
    url: string
    name: string
    sprites: {
        front_default: string
    }
    height: number
    weight: number
    base_experience: number
    types: [{
        type: {
            name: string
        }
    }]

}
