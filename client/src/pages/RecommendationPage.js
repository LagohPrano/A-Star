import React from 'react';
import { getCompanyCategoryRecommendation, getCompanyRegionRecommendation } from '../fetcher';

const recommendationColumns = [
    {
        title: 'Company Category',
        dataIndex: 'Company Category',
        key: 'Company Category',
    },

    {
        title: 'Company Region',
        dataIndex: 'Company Region',
        key: 'Company Region',
    }
]