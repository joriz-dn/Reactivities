type LocationIQSuggestion = {
    place_id: string
    osm_id: string
    osm_type: string
    licence: string
    lat: string
    lon: string
    boundingbox: string[]
    class: string
    type: string
    display_name: string
    display_place: string
    display_address: string
    address: Address
}

type LocationIQAddress = {
    name: string
    state: string
    country: string
    country_code: string
    city?: string
    town?: string
    suburb?: string
    village?: string
    postcode?: string
}
