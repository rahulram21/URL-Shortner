

export const encodeToShortUrl = (longUrl) => {
    if(!longUrl) return null;
    const encoded = Buffer.from(longUrl).toString('base64');
    if(encoded){
        return encoded;
    }
}