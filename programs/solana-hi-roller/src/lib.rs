use anchor_lang::prelude::*;
use anchor_lang::solana_program::system_program;

use chainlink_solana as chainlink;

declare_id!("Bdj3Nj33HHPViMmGrXKuZ37cUYyuyq6JQC5sYKwMYcZi");

#[account]
pub struct Dice {
    pub value: i128,
}


#[program]
pub mod roll_dice {
    use super::*;
    pub fn execute(ctx: Context<Execute>) -> ProgramResult  {
        let round = chainlink::latest_round_data(
            ctx.accounts.chainlink_program.to_account_info(),
            ctx.accounts.chainlink_feed.to_account_info(),
        )?;

        let description = chainlink::description(
            ctx.accounts.chainlink_program.to_account_info(),
            ctx.accounts.chainlink_feed.to_account_info(),
        )?;

        // Set the account value
        let dice: &mut Account<Dice> = &mut ctx.accounts.dice;
        dice.value=round.answer % 6;

        // Print dice value to console, and where it was derived from
        msg!("Dice rolled: {}. This random number was derived from {} price", round.answer % 6, description);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Execute<'info> {
    #[account(init, payer = user, space = 100)]
    pub dice: Account<'info, Dice>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub chainlink_feed: AccountInfo<'info>,
    pub chainlink_program: AccountInfo<'info>,
    #[account(address = system_program::ID)]
    pub system_program: AccountInfo<'info>,
}
