interface IDetails {
    mainurl: string,
    shortUrl : string,
    visitors: number,
    location: ILocation,
    device: string 
}
interface ILocation {
    ip: string,
    country: string,
    place: string
}

export default IDetails