"""Updated user password field

Revision ID: b19d21eb4847
Revises: 4b5c069ea9c7
Create Date: 2025-03-10 22:07:37.961067

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b19d21eb4847'
down_revision = '4b5c069ea9c7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password_hash', sa.String(length=255), nullable=False))
        batch_op.drop_column('password')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_column('password_hash')

    # ### end Alembic commands ###
