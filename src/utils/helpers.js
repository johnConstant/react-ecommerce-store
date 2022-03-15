export const formatPrice = (number) => {
    const newNumber = Intl.NumberFormat('en-UK', {
        style: 'currency',
        currency: 'EUR',
    }).format(number / 100);

    return newNumber;
};

export const getUniqueValues = () => {};
