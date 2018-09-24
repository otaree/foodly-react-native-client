export const toRupee = (paise) => {
    const rupees = Number(paise) / 100
    return rupees.toFixed(2)
}