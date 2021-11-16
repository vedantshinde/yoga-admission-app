/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
import moment from 'moment';

export const postUpdatedBatch = async (batch_id) => {

    try {
            // Set Start time & End Time
            var start_time = '6:00AM';
            var end_time = '7:00AM';

            switch(batch_id) {
                case '2':
                    start_time = '7:00AM';
                    end_time = '8:00AM';
                    break;
                case '3':
                    start_time = '8:00AM';
                    end_time = '9:00AM'
                    break;
                case '4':
                    start_time = '5:00PM';
                    end_time = '6:00PM'
                    break;
                default:
                    start_time = '6:00AM';
                    end_time = '7:00AM';
            }

            // Set Activation Date

            // const now = new Date();
            // var activation_date = new Date();
            // if (now.getMonth() === 11) {
            //     activation_date = new Date(now.getFullYear() + 1, 0, 1);
            // } else {
            //     activation_date = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            // }   

        var activation_date = moment().add(1, 'months').clone().startOf('month').format('YYYY-MM-DD');

            
        const res = await axios({
            method: 'POST',
            url: '/api/v1/batches/update-user-batch',
            data: {
                start_time,
                end_time,
                activation_date
            }
        });

        if(res.data.status === 'success'){
            showAlert('success', 'Your Batch Timing Updated Successfully!');

            window.setTimeout(() => {
                location.assign('/me');
              }, 500);
        }

    } catch(err){
        showAlert('error', err.response.data.message);
    }
};