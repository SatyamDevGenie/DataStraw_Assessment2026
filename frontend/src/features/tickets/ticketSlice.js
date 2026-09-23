import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
    tickets: [],
    currentTicket: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
};

export const fetchTickets = createAsyncThunk(
    'tickets/fetchAll',
    async ({ status = '', search = '' } = {}, thunkAPI) => {
        try {
            return await ticketService.getTickets(status, search);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const fetchTicketById = createAsyncThunk(
    'tickets/fetchOne',
    async (ticket_id, thunkAPI) => {
        try {
            return await ticketService.getTicketById(ticket_id);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createNewTicket = createAsyncThunk(
    'tickets/create',
    async (ticketData, thunkAPI) => {
        try {
            return await ticketService.createTicket(ticketData);
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const updateTicketDetails = createAsyncThunk(
    'tickets/update',
    async ({ ticket_id, updateData }, thunkAPI) => {
        try {
            await ticketService.updateTicket(ticket_id, updateData);
            return thunkAPI.dispatch(fetchTicketById(ticket_id));
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const ticketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tickets = action.payload;
            })
            .addCase(fetchTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(fetchTicketById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTicketById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentTicket = action.payload;
            })
            .addCase(fetchTicketById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createNewTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewTicket.fulfilled, (state) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(createNewTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;