import React from 'react';
import MainMenuItem from '@/Shared/MainMenuItem';

export default ({ className }) => {
  return (
    <div className={className}>
      <MainMenuItem text="Dashboard" link="dashboard"  />
      <MainMenuItem text="Payments" link="payments"  />
      <MainMenuItem text="Customers" link="customers"  />
      <MainMenuItem text="Plans" link="plans"  />
      <MainMenuItem text="Expense Category" link="expense.category"  />
      <MainMenuItem text="Expense" link="expense" />
      <MainMenuItem text="Panels" link="panels"  />
    </div>
  );
};
