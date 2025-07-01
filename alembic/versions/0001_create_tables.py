from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table('transaction',
        sa.Column('id', sa.UUID(as_uuid=True), primary_key=True),
        sa.Column('amount', sa.Integer()),
        sa.Column('currency', sa.String()),
        sa.Column('status', sa.String()),
        sa.Column('created_at', sa.DateTime(timezone=True))
    )
    op.create_table('ledgerposting',
        sa.Column('id', sa.UUID(as_uuid=True), primary_key=True),
        sa.Column('tx_id', sa.UUID(as_uuid=True)),
        sa.Column('debit_account', sa.String()),
        sa.Column('credit_account', sa.String()),
        sa.Column('amount', sa.Integer())
    )
    op.create_table('idempotencykey',
        sa.Column('key', sa.String(), primary_key=True),
        sa.Column('response_json', sa.Text()),
        sa.Column('created_at', sa.DateTime(timezone=True))
    )

def downgrade():
    op.drop_table('idempotencykey')
    op.drop_table('ledgerposting')
    op.drop_table('transaction')
