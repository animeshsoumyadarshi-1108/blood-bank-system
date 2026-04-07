module.exports = (lastDonationDate) => {
  if (!lastDonationDate) return true;

  const nextEligible = new Date(lastDonationDate);
  nextEligible.setDate(nextEligible.getDate() + 90);

  return {
    nextEligibleDate: nextEligible,
    isEligible: new Date() >= nextEligible
  };
};